import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { registerComponent } from './register.component'; // 请注意此处的 LoginComponent 导入

// 声明一个临时的测试组件，以用于测试
@Component({
  template: '', // 可以为空，因为我们只需要测试 LoginComponent 的创建
})
class TestComponent {}

describe('registerComponent', () => {
  let component: registerComponent;
  let fixture: ComponentFixture<registerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [registerComponent, TestComponent], // 声明 LoginComponent 和 TestComponent
    }).compileComponents();

    fixture = TestBed.createComponent(registerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
